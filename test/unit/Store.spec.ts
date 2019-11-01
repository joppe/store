import { Store } from '@apestaartje/store/Store';

interface Data {
    foo: string;
    n: number;
    isBar: boolean;
    items: number[];
}

describe('Store', (): void => {
    const d: Data = {foo: 'bar', n: 12, isBar: false, items: [0]};
    let s: Store<Data>;

    beforeEach((): void => {
        s = new Store(d);
    });

    describe('get', (): void => {
        it('retrieve the value from store', (): void => {
            expect(s.get('foo')).toBe('bar');
            expect(s.get('items')).toEqual([0]);
        });
    });

    describe('set', (): void => {
        it('store a new value', (): void => {
            s.set('foo', 'Hello World');

            expect(s.get('foo')).toBe('Hello World');
            expect(d.foo).toBe('bar');
        });
    });

    describe('subscribe', (): void => {
        it('emit new values', (done: Function): void => {
            let count: number = 0;

            /**
             * When the subscription is added the current value is immediately emitted
             */
            s.subscribe('foo', (value: string): void => {
                count += 1;

                if (count === 1) {
                    expect(value).toBe('bar');
                } else {
                    expect(value).toBe('Hello!');
                    done();
                }
            });

            s.set('foo', 'Hello!');
        });
    });
});
