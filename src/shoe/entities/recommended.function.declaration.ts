import { EnumFilter, NumberRangeFilter } from 'src/utility/filter.utility';
import { ConditionEnum, FitEnum, GenderEnum, SeasonEnum, UseCaseEnum, WeatherEnum } from './shoe.entity';

// Range filter for numeric values
const rangeFilter = {
  type: "OBJECT",
  properties: {
    gt: {
      type: "NUMBER",
      description: "Greater than. Filter for values strictly greater than the specified number. Example: { 'gt': 50 } to get values greater than 50."
    },
    lt: {
      type: "NUMBER",
      description: "Less than. Filter for values strictly less than the specified number. Example: { 'lt': 100 } to get values less than 100."
    },
    gte: {
      type: "NUMBER",
      description: "Greater than or equal to. Filter for values greater than or equal to the specified number. Example: { 'gte': 30 } to get values 30 or greater."
    },
    lte: {
      type: "NUMBER",
      description: "Less than or equal to. Filter for values less than or equal to the specified number. Example: { 'lte': 70 } to get values 70 or less."
    }
  },
  description: "Range filter for numeric values. Allows filtering based on greater than, less than, greater than or equal to, and less than or equal to criteria."
};

// Enum filter utility function
const enumValues = (values) => ({
  type: "STRING",
  enum: values,
  description: "Filter based on enum values."
});

// Function declaration for recommending shoes
export const recommendShoesFunctionDeclaration = {
  name: "recommendShoes",
  description: "Filter and recommend shoes based on various criteria.",
  parameters: {
    type: "OBJECT",
    description: "Parameters to filter and recommend shoes.",
    properties: {
      brand: {
        type: "STRING",
        description: "The brand of the shoe. Example: 'Nike', 'Adidas'."
      },
      modelName: {
        type: "STRING",
        description: "The model name of the shoe. Example: 'Air Max 270', 'UltraBoost 21'."
      },
      yearOfManufacture: {
        ...rangeFilter,
        description: "Filter based on the year of manufacture. Example: { 'gte': 2015, 'lte': 2022 }."
      },
      gender: enumValues(Object.values(GenderEnum)),
      size: {
        ...rangeFilter,
        description: "Filter based on shoe size. Example: { 'gte': 7, 'lte': 12 }."
      },
      color: {
        type: "STRING",
        description: "Color of the shoe. Example: 'Red', 'Black'."
      },
      material: {
        type: "STRING",
        description: "Material of the shoe. Example: 'Leather', 'Synthetic'."
      },
      price: {
        ...rangeFilter,
        description: "Filter based on price. Example: { 'gte': 50, 'lte': 200 }."
      },
      used: {
        type: "BOOLEAN",
        description: "Whether the shoe is used or new. Example: `true` for used, `false` for new."
      },
      conditionRating: enumValues(Object.values(ConditionEnum)),
      wearLevel: {
        type: "STRING",
        description: "Wear level of the shoe. Example: 'Light', 'Heavy'."
      },
      repairHistory: {
        type: "STRING",
        description: "Repair history of the shoe. Example: 'No repairs', 'Minor repairs'."
      },
      archSupport: {
        ...rangeFilter,
        description: "Filter based on arch support level. Example: { 'gte': 3, 'lte': 7 }."
      },
      cushioning: {
        ...rangeFilter,
        description: "Filter based on cushioning level. Example: { 'gte': 5, 'lte': 9 }."
      },
      fit: enumValues(Object.values(FitEnum)),
      breathability: {
        ...rangeFilter,
        description: "Filter based on breathability rating. Example: { 'gte': 4, 'lte': 8 }."
      },
      flexibility: {
        ...rangeFilter,
        description: "Filter based on flexibility rating. Example: { 'gte': 3, 'lte': 6 }."
      },
      materialQuality: {
        ...rangeFilter,
        description: "Filter based on material quality rating. Example: { 'gte': 2, 'lte': 5 }."
      },
      soleDurability: {
        ...rangeFilter,
        description: "Filter based on sole durability rating. Example: { 'gte': 4, 'lte': 7 }."
      },
      stitchingQuality: {
        ...rangeFilter,
        description: "Filter based on stitching quality rating. Example: { 'gte': 3, 'lte': 6 }."
      },
      waterResistance: {
        type: "STRING",
        description: "Water resistance of the shoe. Example: 'Waterproof', 'Water-resistant'."
      },
      designAppeal: {
        ...rangeFilter,
        description: "Filter based on design appeal rating. Example: { 'gte': 5, 'lte': 10 }."
      },
      trendiness: {
        ...rangeFilter,
        description: "Filter based on trendiness rating. Example: { 'gte': 6, 'lte': 9 }."
      },
      versatility: {
        ...rangeFilter,
        description: "Filter based on versatility rating. Example: { 'gte': 4, 'lte': 8 }."
      },
      uniqueness: {
        ...rangeFilter,
        description: "Filter based on uniqueness rating. Example: { 'gte': 3, 'lte': 7 }."
      },
      traction: {
        ...rangeFilter,
        description: "Filter based on traction rating. Example: { 'gte': 5, 'lte': 8 }."
      },
      support: {
        ...rangeFilter,
        description: "Filter based on support level. Example: { 'gte': 4, 'lte': 9 }."
      },
      weight: {
        ...rangeFilter,
        description: "Filter based on weight. Example: { 'gte': 200, 'lte': 400 } grams."
      },
      stability: {
        ...rangeFilter,
        description: "Filter based on stability rating. Example: { 'gte': 5, 'lte': 8 }."
      },
      valueRating: {
        ...rangeFilter,
        description: "Filter based on value rating. Example: { 'gte': 4, 'lte': 7 }."
      },
      ecoFriendliness: {
        ...rangeFilter,
        description: "Filter based on eco-friendliness rating. Example: { 'gte': 3, 'lte': 6 }."
      },
      ethicalProduction: {
        type: "BOOLEAN",
        description: "Whether the shoe is produced ethically. Example: `true` for ethically produced, `false` otherwise."
      },
      recycledMaterials: {
        ...rangeFilter,
        description: "Filter based on recycled materials rating. Example: { 'gte': 2, 'lte': 5 }."
      },
      intendedUse: enumValues(Object.values(UseCaseEnum)),
      seasonalSuitability: enumValues(Object.values(SeasonEnum)),
      weatherResistance: enumValues(Object.values(WeatherEnum)),
      sku: {
        type: "STRING",
        description: "Stock Keeping Unit (SKU) of the shoe. Example: 'ABC123'."
      },
      releaseDate: {
        type: "STRING",
        description: "Release date of the shoe in ISO 8601 format. Example: '2024-01-15'."
      }
    },
    required: [
      "size"
    ]
  }
};
