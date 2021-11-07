export type Accepted = 'waiting' | 'yes' | 'no';
export type Menu = 'animal' | 'vegetariano' | 'vegano';
export type Bus = 'alcazar' | 'ninguno';

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
    id?: string | null
    name: string | null,
    intolerance?: string,
    menu: Menu | null, // aqui molaria un enum
    bus: Bus | null,
}

export interface UserItem {
    accepted: Accepted,
    _id?:string | null,
    name: string | null,
    intolerance?: string,
    menu: Menu | null, // aqui molaria un enum
    bus: Bus | null,
    guests?: Array<GuestItem>
}

export interface OptionsModel {
    label: string | null,
    value: Menu | Bus | null,
    description?: string | null,
    category?: string | null,
    icon?: string | null
}

export interface GuestFinalInfoModel {
    guest: { name: string | null, _id:string | null }
    menu: OptionsModel | null,
    bus: OptionsModel | null,
    intolerance:string
}
