import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsInt, Min, Max, IsBoolean, IsEnum, IsString, IsOptional, IsNumber, IsDate } from 'class-validator';

export enum GenderEnum {
  MALE = 'Male',
  FEMALE = 'Female',
  UNISEX = 'Unisex'
}

export enum FitEnum {
  TRUE_TO_SIZE = 'True to Size',
  RUNS_SMALL = 'Runs Small',
  RUNS_LARGE = 'Runs Large'
}

export enum ConditionEnum {
  POOR = 'Poor',
  FAIR = 'Fair',
  GOOD = 'Good',
  VERY_GOOD = 'Very Good',
  EXCELLENT = 'Excellent'
}

export enum UseCaseEnum {
  CASUAL = 'Casual',
  RUNNING = 'Running',
  HIKING = 'Hiking',
  FORMAL = 'Formal'
}

export enum SeasonEnum {
  SUMMER = 'Summer',
  WINTER = 'Winter',
  ALL_SEASON = 'All Season'
}

export enum WeatherEnum {
  RAIN = 'Rain',
  SNOW = 'Snow',
  DRY = 'Dry'
}

@Entity()
export class Shoe {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  brand: string;

  @Column()
  @IsString()
  modelName: string;

  @Column()
  @IsInt()
  yearOfManufacture: number;

  @Column({ type: 'enum', enum: GenderEnum })
  @IsEnum(GenderEnum)
  gender: GenderEnum;

  @Column('float')
  @IsNumber()
  size: number;

  @Column()
  @IsString()
  color: string;

  @Column()
  @IsString()
  material: string;

  @Column('float')
  @IsNumber()
  price: number;

  @Column({ default: false })
  @IsBoolean()
  used: boolean;

  @Column({ type: 'enum', enum: ConditionEnum, nullable: true })
  @IsEnum(ConditionEnum)
  @IsOptional()
  conditionRating: ConditionEnum;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  wearLevel: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  repairHistory: string;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  archSupport: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  cushioning: number;

  @Column({ type: 'enum', enum: FitEnum, nullable: true })
  @IsEnum(FitEnum)
  @IsOptional()
  fit: FitEnum;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  breathability: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  flexibility: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  materialQuality: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  soleDurability: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  stitchingQuality: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  waterResistance: string;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  designAppeal: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  trendiness: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  versatility: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  uniqueness: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  traction: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  support: number;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  weight: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  stability: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  valueRating: number;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  ecoFriendliness: number;

  @Column({ nullable: true })
  @IsBoolean()
  @IsOptional()
  ethicalProduction: boolean;

  @Column({ nullable: true })
  @IsNumber()
  @IsOptional()
  recycledMaterials: number; // Percentage

  @Column({ type: 'enum', enum: UseCaseEnum, nullable: true })
  @IsEnum(UseCaseEnum)
  @IsOptional()
  intendedUse: UseCaseEnum;

  @Column({ type: 'enum', enum: SeasonEnum, nullable: true })
  @IsEnum(SeasonEnum)
  @IsOptional()
  seasonalSuitability: SeasonEnum;

  @Column({ type: 'enum', enum: WeatherEnum, nullable: true })
  @IsEnum(WeatherEnum)
  @IsOptional()
  weatherResistance: WeatherEnum;

  @Column()
  @IsString()
  sku: string;

  @Column({ type: 'date', nullable: true })
  @IsDate()
  @IsOptional()
  releaseDate: Date;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  countryOfOrigin: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  batchNumber: string;

  @Column({ nullable: true })
  @IsInt()
  @Min(1)
  @Max(10)
  @IsOptional()
  userRating: number;

  @Column({ nullable: true })
  @IsInt()
  @IsOptional()
  numberOfReviews: number;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  topPositiveReview: string;

  @Column({ nullable: true })
  @IsString()
  @IsOptional()
  topNegativeReview: string;
}
