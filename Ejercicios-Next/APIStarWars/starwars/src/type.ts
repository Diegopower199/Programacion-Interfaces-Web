export type PlanetsAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Planet[];
};

export type PlanetAPI = {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  residents: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Planet = Omit<PlanetAPI, "residents" | "films"> & {
  residents: Array<{
    name: string;
  }>;
  films: Array<{
    title: string;
  }>;
};

export type Planets = Omit<PlanetsAPI, "results"> & {
  results: Planet[];
};

export type FilmsAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Film[];
};

export type FilmAPI = {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
};

export type Film = Omit<FilmAPI, "characters" | "planets" | "starships" | "vehicles" | "species"> & {
  characters: Array<{
    url: string;
  }>;
  planets: Array<{
    url: string;
  }>;
  starships: Array<{
    url: string;
  }>;
  vehicles: Array<{
    url: string;
  }>;
  species: Array<{
    url: string;
  }>;
};

export type Films = Omit<FilmsAPI, "results"> & {
  results: Film[];
};

export type PeoplesAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: People[];
};

export type PeopleAPI = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
};

export type People = Omit<PeopleAPI, "films" | "species" | "vehicles" | "starships"> & {
  films: Array<{
    url: string;
  }>;
  species: Array<{
    url: string;
  }>;
  vehicles: Array<{
    url: string;
  }>;
  starships: Array<{
    url: string;
  }>;
};

export type Peoples = Omit<PeoplesAPI, "results"> & {
  results: People[];
};

export type SpeciesAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Specie[];
};

export type SpecieAPI = {
  name: string;
  classification: string;
  designation: string;
  average_height: string;
  skin_colors: string;
  hair_colors: string;
  eye_colors: string;
  average_lifespan: string;
  homeworld: string;
  language: string;
  people: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Specie = Omit<SpecieAPI, "films" | "people"> & {
  films: Array<{
    url: string;
  }>;
  people: Array<{
    url: string;
  }>;
};

export type Species = Omit<SpeciesAPI, "results"> & {
  results: Specie[];
};

export type VehiclesAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Vehicle[];
};

export type VehicleAPI = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  vehicle_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Vehicle = Omit<VehicleAPI, "pilots" | "films"> & {
  films: Array<{
    url: string;
  }>;
  pilots: Array<{
    url: string;
  }>;
};

export type Vehicles = Omit<VehiclesAPI, "results"> & {
  results: Vehicle[];
};

export type StarshipsAPI = {
  count: number;
  next?: string;
  previous?: string;
  results: Starship[];
};

export type StarshipAPI = {
  name: string;
  model: string;
  manufacturer: string;
  cost_in_credits: string;
  length: string;
  max_atmosphering_speed: string;
  crew: string;
  passengers: string;
  cargo_capacity: string;
  consumables: string;
  hyperdrive_rating: string;
  MGLT: string;
  starship_class: string;
  pilots: string[];
  films: string[];
  created: string;
  edited: string;
  url: string;
};

export type Starship = Omit<StarshipAPI, "pilots" | "films"> & {
  films: Array<{
    url: string;
  }>;
  pilots: Array<{
    url: string;
  }>;
};

export type Starships = Omit<StarshipsAPI, "results"> & {
  results: Starship[];
};
