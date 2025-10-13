
export interface IPosts {
    id: number,
    name: string,
    description: string,
    img: string,
    likes: number
}
export type IPostCreate = Omit<IPosts,"id"> & {id?:number}
export type IPostUpdate = Partial<Omit<IPosts,"id"> >
export interface IcountBody {
    count: number
}
export interface IAnswer {
    response: string | IPosts | IPosts[],
status: number
}
// export type IAnswero = IAnswer