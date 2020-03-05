import { ModelsInterface } from './ModelsInterface';

export interface BaseModelInterface {
    prototype?; //opcional '?'
    associate?(models: ModelsInterface): void; //opcional '?'
}
