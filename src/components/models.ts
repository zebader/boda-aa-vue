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
    name: string | null,
    gender: string | null,
    menu: string | null, // aqui molaria un enum
    bus: string | null,
    formFilled: boolean
}
