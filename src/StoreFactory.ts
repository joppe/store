import { Store } from './Store';

export interface StoreFactory {
    <T extends object>(initial: T): Store<T>;
}
