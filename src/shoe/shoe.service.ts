import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConditionEnum, FitEnum, GenderEnum, SeasonEnum, Shoe, UseCaseEnum, WeatherEnum } from './entities/shoe.entity';
import { EnumFilter, NumberRangeFilter, applyEnumFilter, buildRangeFilter } from 'src/utility/filter.utility';

@Injectable()
export class ShoeService {
  constructor(
    @InjectRepository(Shoe) private shoeRepository: Repository<Shoe>,
  ) {}

  async filterShoes(filters: {
    brand?: string;
    modelName?: string;
    yearOfManufacture?: NumberRangeFilter;
    gender?: EnumFilter<GenderEnum>;
    size?: NumberRangeFilter;
    color?: string;
    material?: string;
    price?: NumberRangeFilter;
    used?: boolean;
    conditionRating?: EnumFilter<ConditionEnum>;
    wearLevel?: string;
    repairHistory?: string;
    archSupport?: NumberRangeFilter;
    cushioning?: NumberRangeFilter;
    fit?: EnumFilter<FitEnum>;
    breathability?: NumberRangeFilter;
    flexibility?: NumberRangeFilter;
    materialQuality?: NumberRangeFilter;
    soleDurability?: NumberRangeFilter;
    stitchingQuality?: NumberRangeFilter;
    waterResistance?: string;
    designAppeal?: NumberRangeFilter;
    trendiness?: NumberRangeFilter;
    versatility?: NumberRangeFilter;
    uniqueness?: NumberRangeFilter;
    traction?: NumberRangeFilter;
    support?: NumberRangeFilter;
    weight?: NumberRangeFilter;
    stability?: NumberRangeFilter;
    valueRating?: NumberRangeFilter;
    ecoFriendliness?: NumberRangeFilter;
    ethicalProduction?: boolean;
    recycledMaterials?: NumberRangeFilter;
    intendedUse?: EnumFilter<UseCaseEnum>;
    seasonalSuitability?: EnumFilter<SeasonEnum>;
    weatherResistance?: EnumFilter<WeatherEnum>;
    sku?: string;
    releaseDate?: Date;
    countryOfOrigin?: string;
    batchNumber?: string;
    userRating?: NumberRangeFilter;
    numberOfReviews?: NumberRangeFilter;
    topPositiveReview?: string;
    topNegativeReview?: string;
  }): Promise<any> {
    let queryOptions: any = [];

    // Define and apply string filters
    const stringFilters = [
      'brand', 'modelName', 'color', 'material', 'wearLevel', 'repairHistory',
      'waterResistance', 'sku', 'countryOfOrigin', 'batchNumber',
      'topPositiveReview', 'topNegativeReview'
    ];

    stringFilters.forEach(field => {
      if (filters[field] !== undefined) {
        queryOptions.push({field: filters[field]});
      }
    });

    // Define and apply number range filters
    const numberRangeFilters = [
      'yearOfManufacture', 'size', 'price', 'archSupport', 'cushioning',
      'breathability', 'flexibility', 'materialQuality', 'soleDurability',
      'stitchingQuality', 'designAppeal', 'trendiness', 'versatility',
      'uniqueness', 'traction', 'support', 'weight', 'stability',
      'valueRating', 'ecoFriendliness', 'recycledMaterials', 'userRating',
      'numberOfReviews'
    ];

    numberRangeFilters.forEach(field => {
      if (filters[field] !== undefined) {
        console.log("field", field);
        queryOptions = [...queryOptions, ...buildRangeFilter(field, filters[field])];
      }
    });

    // Define and apply enum filters
    const enumFilters: Record<string, any> = {
      gender: GenderEnum,
      conditionRating: ConditionEnum,
      fit: FitEnum,
      intendedUse: UseCaseEnum,
      seasonalSuitability: SeasonEnum,
      weatherResistance: WeatherEnum
    };

    for (const [field, enumType] of Object.entries(enumFilters)) {
      if (filters[field] !== undefined) {
        applyEnumFilter(queryOptions, field, filters[field]);
      }
    }

    // Apply boolean filters
    if (filters.used !== undefined) {
      queryOptions.used = filters.used;
    }
    if (filters.ethicalProduction !== undefined) {
      queryOptions.ethicalProduction = filters.ethicalProduction;
    }

    // Handle date filter if needed
    if (filters.releaseDate) {
      queryOptions.releaseDate = filters.releaseDate;
    }

    console.log("queryOptions", queryOptions);
    const results = await this.shoeRepository.find({
      where: queryOptions,
    });

    return { "filtered_shoes": results, "text": "Shoes filtered successfully" };
  }
}
