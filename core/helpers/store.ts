import { onSet as onSetBase } from 'nanostores';
import type { PreinitializedWritableAtom, ReadableAtom } from 'nanostores';
import { isDeepEqual } from '../utils/object';

export const onSetMemo = (
  stores: PreinitializedWritableAtom<unknown>[] | ReadableAtom[],
) => {
  for (const store of stores) {
    onSetBase(store, ({ newValue, abort }) => {
      if (isDeepEqual(store.get(), newValue)) {
        abort();
      }
    });
  }
};
