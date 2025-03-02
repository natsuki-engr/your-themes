import useSWR, { KeyedMutator } from "swr";
import ManageState from "../controllers/manageState";

export const useStaticSWR = <Data>(
  key: string,
  initialData: Data,
): { data: Data; mutate: KeyedMutator<Data> } => {
  // VSCodeのgetStateから保存された状態を取得
  const savedState = ManageState.getState(key);

  const { data, mutate: originalMutate } = useSWR<Data>(key, null, {
    fallbackData: (savedState as Data) ?? initialData,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const mutate: KeyedMutator<Data> = async (data, opts) => {
    const result = await originalMutate(data, opts);

    ManageState.setState(key, result ?? null);

    return result;
  };

  return { data: data as Data, mutate };
};
