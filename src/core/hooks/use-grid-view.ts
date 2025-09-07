import { useLayoutEffect } from "react";
import type { GridViewConfig } from "../../../core/store/grid-view/types";
import type { DeepPartial } from "../../../core/types";

import { useAction } from "./use-action";

type UseCalendarOptions = {
  config?: DeepPartial<GridViewConfig>;
};

export const useGridView = (config?: UseCalendarOptions["config"]) => {
  const actions = useAction();

  useLayoutEffect(() => {
    if (config) {
      actions.gridView.setConfig(config);
    }
  }, [config, actions]);
};
