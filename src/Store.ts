import * as observable from '@apestaartje/observable';

export class Store<T extends object> {
    private _state: T;
    // tslint:disable-next-line no-any
    private readonly _subjects: {[key: string]: observable.subject.CurrentValueSubject<any>} = {};

    public constructor(initial: T) {
        this._state = {...initial};
    }

    public get<P extends Extract<keyof T, string>>(key: P): T[P] {
        return this._state[key];
    }

    public set<P extends Extract<keyof T, string>>(key: P, value: T[P]): void {
        this._state = {
            ...this._state,
            [key]: value,
        };

        if (this._subjects[key] !== undefined) {
            this._subjects[key].next(this._state[key]);
        }
    }

    public subscribe<P extends Extract<keyof T, string>>(key: P, handler: (value: T[P]) => void): observable.observable.Subscription {
        let subject: observable.subject.CurrentValueSubject<T[P]> | undefined = this._subjects[<string>key];

        if (subject === undefined) {
            subject = new observable.subject.CurrentValueSubject<T[P]>(this.get(key));
            this._subjects[<string>key] = subject;
        }

        return subject.subscribe({
            next: handler,
        });
    }
}
