import { useState, useEffect } from 'react';
import type { FC } from 'react';
import React from 'react';
import { Text } from 'ink';
import spinners from 'cli-spinners';
import type { SpinnerName } from 'cli-spinners';

// This file is a copy of https://github.com/vadimdemedes/ink-spinner, but for some reason it's
// not working when importing as an npm package.
// https://github.com/vadimdemedes/ink-spinner/issues/15

interface Props {
  /**
   * Type of a spinner.
   * See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.
   *
   * @default dots
   */
  type?: SpinnerName;
}

/**
 * Spinner.
 */
const Spinner: FC<Props> = ({ type = 'dots' }) => {
  const [frame, setFrame] = useState(0);
  const spinner = spinners[type];

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame(previousFrame => {
        const isLastFrame = previousFrame === spinner.frames.length - 1;
        return isLastFrame ? 0 : previousFrame + 1;
      });
    }, spinner.interval);

    return () => {
      clearInterval(timer);
    };
  }, [spinner]);

  return <Text>{spinner.frames[frame]}</Text>;
};

export default Spinner;