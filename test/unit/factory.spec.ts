import { factory } from '@apestaartje/store/factory';
import { Store } from '@apestaartje/store/Store';

interface Data {
    prop: string;
}

describe('factory', (): void => {
    it('returns always the same store', (): void => {
        const s1: Store<Data> = factory({ prop: '1' });
        const s2: Store<Data> = factory({ prop: '2' });

        expect(s1.get('prop')).toBe('1');
        expect(s1).toBe(s2);
    });
});
