type Attribute = {
  id: number;
  name: string;
  parent_id?: number;
  sizing_type?: string;
};

type Attributes = {
  categories: Attribute[];
  subCategories: Attribute[];
  conditions: Attribute[];
  sizes: Attribute[];
  locations: Attribute[];
  colors: Attribute[];
  wardrobes?: WardrobeDataApi[];
};

type AttributeIds = {
  categories: (number | "")[];
  subCategories: (number | "")[];
  conditions: (number | "")[];
  sizes: (number | "")[];
  locations: (number | "")[];
  colors: (number | "")[];
};

type AttributeNames = {
  categories: string[];
  subCategories: string[];
  conditions: string[];
  sizes: string[];
  locations: string[];
  colors: string[];
};
