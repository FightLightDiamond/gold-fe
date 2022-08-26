import { useEffect, useRef} from "react";
import VanillaTilt from "vanilla-tilt";

function Tilt(props: any) {
  const { options, ...rest } = props;
  const tilt = useRef<any>(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return <div ref={tilt} {...rest} />;
}

export {Tilt}
