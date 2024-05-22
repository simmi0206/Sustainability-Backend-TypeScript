import { ObjectsBatcher, WeaviateClient } from 'weaviate-ts-client';
import { EmissionFactor } from '../../import-emission-factor/dto/EmissionFactor';

// Need to use require because of this issue: https://stackoverflow.com/questions/76011437/typescript-default-import-from-installed-module-not-working-correctly
declare function require(name: string);

const weaviate = require('weaviate-ts-client');

export class EmissionFactorDatabase {
  client: WeaviateClient;
  className = 'EmissionFactor';
  batchSize = 100;

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
          name: 'source',
          dataType: ['string'],
        },
        {
          name: 'unit',
          dataType: ['string'],
        },
        {
          name: 'country',
          dataType: ['string'],
        },
        {
          name: 'region',
          dataType: ['string'],
        },
        {
          name: 'footprintUnit',
          dataType: ['string'],
        },
        {
          name: 'factor',
          dataType: ['number'],
        },
        {
          name: 'quantity',
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

    await this.client.schema.classCreator().withClass(schemaConfig).do();
  }

  async importEmissionFactor(materialEmissions: Array<EmissionFactor>) {
    materialEmissions.map(async (material: EmissionFactor) => {
      material.greenScore = await this.getGreenScore(material);
      return material;
    });

    let batcher: ObjectsBatcher = this.client.batch.objectsBatcher();
    let counter = 0;
    let batchCounter = 0;

    for (const { id, ...material } of materialEmissions) {
      // Construct an object with a class and properties 'answer' and 'question'
      const obj = {
        class: this.className,
        id: id,
        properties: { ...material },
      };
      // add the object to the batch queue
      batcher = batcher.withObject(obj);

      // When the batch counter reaches batchSize, push the objects to Weaviate
      if (counter++ == this.batchSize) {
        // flush the batch queue
        await batcher.do();

        // restart the batch queue
        counter = 0;
        batcher = this.client.batch.objectsBatcher();
        console.log(batchCounter * this.batchSize + counter);
        batchCounter++;
      }
    }

    // Flush the remaining objects
    await batcher.do();
  }

  async getRecommendation(materialId: string) {
    const result = await this.client.graphql
      .get()
      .withClassName(this.className)
      .withFields(
        'source, country, factor, quantity, region, greenScore, unit, footprintUnit, _additional { id }',
      )
      .withNearObject({ id: materialId })
      .withLimit(5)
      .do();
    const resultList = result.data.Get[this.className];
    resultList.map(async (material: EmissionFactor) => {
      material.greenScore = await this.getGreenScore(material);
      return material;
    });
    return resultList;
  }

  async getGreenScore(material: EmissionFactor) {
    const co2Factor = material.factor;

    if (co2Factor == 0) {
      return 0;
    }
    return Math.ceil(1000 / co2Factor);
  }
}
