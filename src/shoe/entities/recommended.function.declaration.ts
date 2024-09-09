import { EnumFilter, NumberRangeFilter } from 'src/utility/filter.utility';
import { ConditionEnum, FitEnum, GenderEnum, SeasonEnum, UseCaseEnum, WeatherEnum } from './shoe.entity';

const rangeFilter = {
  type: "OBJECT",
  properties: {
    gt: { type: "NUMBER" },
    lt: { type: "NUMBER" },
    gte: { type: "NUMBER" },
    lte: { type: "NUMBER" }
  },
  description: "Range filter for numeric values."
};

const enumValues = (values: string[]) => ({
  type: "STRING",
  enum: values,
  description: "Filter based on enum values."
});

export const recommendShoesFunctionDeclaration = {
  name: "recommendShoes",
  parameters: {
    type: "OBJECT",
    description: "Filter and recommend shoes based on various criteria.",
    properties: {
      brand: {
        type: "STRING",
        description: "Brand of the shoe."
      },
      modelName: {
        type: "STRING",
        description: "Model name of the shoe."
      },
      yearOfManufacture: {
        ...rangeFilter,
        description: "Range filter for year of manufacture."
      },
      gender: enumValues(Object.values(GenderEnum)),
      size: {
        ...rangeFilter,
        description: "Range filter for shoe size."
      },
      color: {
        type: "STRING",
        description: "Color of the shoe."
      },
      material: {
        type: "STRING",
        description: "Material of the shoe."
      },
      price: {
        ...rangeFilter,
        description: "Range filter for price."
      },
      used: {
        type: "BOOLEAN",
        description: "Whether the shoe is used or not."
      },
      conditionRating: enumValues(Object.values(ConditionEnum)),
      wearLevel: {
        type: "STRING",
        description: "Wear level of the shoe."
      },
      repairHistory: {
        type: "STRING",
        description: "Repair history of the shoe."
      },
      archSupport: {
        ...rangeFilter,
        description: "Range filter for arch support."
      },
      cushioning: {
        ...rangeFilter,
        description: "Range filter for cushioning."
      },
      fit: enumValues(Object.values(FitEnum)),
      breathability: {
        ...rangeFilter,
        description: "Range filter for breathability."
      },
      flexibility: {
        ...rangeFilter,
        description: "Range filter for flexibility."
      },
      materialQuality: {
        ...rangeFilter,
        description: "Range filter for material quality."
      },
      soleDurability: {
        ...rangeFilter,
        description: "Range filter for sole durability."
      },
      stitchingQuality: {
        ...rangeFilter,
        description: "Range filter for stitching quality."
      },
      waterResistance: {
        type: "STRING",
        description: "Water resistance of the shoe."
      },
      designAppeal: {
        ...rangeFilter,
        description: "Range filter for design appeal."
      },
      trendiness: {
        ...rangeFilter,
        description: "Range filter for trendiness."
      },
      versatility: {
        ...rangeFilter,
        description: "Range filter for versatility."
      },
      uniqueness: {
        ...rangeFilter,
        description: "Range filter for uniqueness."
      },
      traction: {
        ...rangeFilter,
        description: "Range filter for traction."
      },
      support: {
        ...rangeFilter,
        description: "Range filter for support."
      },
      weight: {
        ...rangeFilter,
        description: "Range filter for weight."
      },
      stability: {
        ...rangeFilter,
        description: "Range filter for stability."
      },
      valueRating: {
        ...rangeFilter,
        description: "Range filter for value rating."
      },
      ecoFriendliness: {
        ...rangeFilter,
        description: "Range filter for eco-friendliness."
      },
      ethicalProduction: {
        type: "BOOLEAN",
        description: "Whether the shoe is ethically produced."
      },
      recycledMaterials: {
        ...rangeFilter,
        description: "Range filter for recycled materials."
      },
      intendedUse: enumValues(Object.values(UseCaseEnum)),
      seasonalSuitability: enumValues(Object.values(SeasonEnum)),
      weatherResistance: enumValues(Object.values(WeatherEnum)),
      sku: {
        type: "STRING",
        description: "Stock Keeping Unit (SKU) of the shoe."
      },
      releaseDate: {
        type: "STRING",
        description: "Release date of the shoe in ISO 8601 format."
      }
    },
    required: [
      "size"
    ]
  }
};
