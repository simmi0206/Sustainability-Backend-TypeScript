import { ObjectsBatcher, WeaviateClient } from 'weaviate-ts-client';
import { Material } from '../../material/dto/Material.';

// Need to use require because of this issue: https://stackoverflow.com/questions/76011437/typescript-default-import-from-installed-module-not-working-correctly
declare function require(name: string);

const weaviate = require('weaviate-ts-client');

export class MaterialDatabase {
  client: WeaviateClient;
  className = 'Material';
  batchSize = 50;

  constructor() {
    if (this.client == null) {
      (async () => await this.connect())();
    }
  }

  async connect() {
    try {
      this.client = weaviate.client({
        scheme: 'http',
        host: 'localhost:8080', // Replace with your endpoint
      });
    } catch (error) {
      console.error('Connection to Weaviate failed!', error);
      process.exit();
    }
  }

  async createDatabase() {
    const schemaConfig = {
      class: this.className,
      vectorizer: 'text2vec-transformers',
      properties: [
        {
          name: 'name',
          dataType: ['text'],
        },
        {
          name: 'classification',
          dataType: ['text[]'],
        },
        {
          name: 'referenceYear',
          dataType: ['text'],
        },
        {
          name: 'dataSetValidUntil',
          dataType: ['text'],
        },
        {
          name: 'locationOfOperationSupplyOrProduction',
          dataType: ['text'],
        },
        {
          name: 'description',
          dataType: ['text'],
        },
        {
          name: 'application',
          dataType: ['text'],
        },
        {
          name: 'quantity',
          dataType: ['number'],
        },
        {
          name: 'co2Emission',
          dataType: ['number'],
        },
        {
          name: 'coEmission',
          dataType: ['number'],
        },
        {
          name: 'noxEmission',
          dataType: ['number'],
        },
        {
          name: 'waterUsages',
          dataType: ['number'],
        },
        {
          name: 'greenScore',
          dataType: ['number'],
        },
      ],
      vectorIndexConfig: {
        distance: 'l2-squared',
      },
    };

    return await this.client.schema.classCreator().withClass(schemaConfig).do();
  }

  async importMaterial(materialEmissions: Array<Material>) {
    // materialEmissions.map(async (material: EmissionFactor) => {
    //   material.greenScore = await this.getGreenScore(material);
    //   return material;
    // });

    let batcher: ObjectsBatcher = this.client.batch.objectsBatcher();
    let counter = 0;

    for (const { id, ...material } of materialEmissions) {
      const obj = {
        class: this.className,
        id: id,
        properties: { ...material },
      };

      console.log(obj);

      // add the object to the batch queue
      batcher = batcher.withObject(obj);

      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (counter++ == this.batchSize) {
        // flush the batch queue
        await batcher.do();

        // restart the batch queue
        counter = 0;
        batcher = this.client.batch.objectsBatcher();
      }
    }

    // Flush the remaining objects
    await batcher.do();
  }

  async getMaterial(materialId: string) {
    const result = await this.client.data
      .getterById()
      // .withClassName(this.className)
      .withId(materialId)
      .do();
    result.properties.greenScore = await this.getGreenScore(result.properties);
    console.log(result);
    return result;
  }

  async getMultipleMaterial(num: number) {
    if (!num) {
      num = 50;
    }
    return await this.client.data
      .getter()
      .withClassName(this.className)
      .withLimit(num)
      .do();
  }

  async getRecommendation(materialId: string) {
    const result = await this.client.graphql
      .get()
      .withClassName(this.className)
      .withFields(
        'name, classification, referenceYear, quantity, description, co2Emission, noxEmission, waterUsages,  _additional { id, distance }',
      )
      .withNearObject({ id: materialId, distance: 80 })
      .withLimit(5)
      .do();
    const resultList = result.data.Get[this.className];
    resultList.map(async (material: Material) => {
      material.greenScore = await this.getGreenScore(material);
      return material;
    });
    return resultList;
  }

  async getGreenScore(material) {
    const co2Factor = material.co2Emission;
    const noxFactor = material.noxEmission;
    const waterFactor = material.waterUsages;

    const co2Contribution =
      co2Factor <= 0 ? 0 : Math.ceil(0.7 * (100 / co2Factor));
    const noxContribution =
      noxFactor <= 0 ? 0 : Math.ceil(0.1 * (100 / noxFactor));
    const waterContribution =
      waterFactor <= 0 ? 0 : Math.ceil(0.3 * (100 / waterFactor));

    return co2Contribution + noxContribution + waterContribution;
  }
}
