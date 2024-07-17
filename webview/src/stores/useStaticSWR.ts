import useSWR, { Key, KeyedMutator } from "swr";

export const useStaticSWR = <Data>(key: Key, initialData: Data): { data: Data; mutate: KeyedMutator<Data> } => {
  const { data, mutate } = useSWR<Data>(key, null, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  mutate((_data) => _data || initialData, false);

  return { data: data ?? initialData, mutate };
};
