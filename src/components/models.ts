export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface OptionItem {
    id: number;
    name: string;
    icon: string;
    title: string;
    subtitle: string;
    default:boolean;
}

export interface CountdownClock {
    digit: number;
    text: string;
}

export interface GuestItem {
    accepted: boolean,
    id:string | null,
    name: string | null,
    menu: string | null, // aqui molaria un enum
    bus: string | null,
    relatives?: Array<GuestItem>
}

export interface optionsModel {
    label: string | null,
    value: string | null,
    description: string | null,
    category?: string | null,
    icon?: string | null
}
