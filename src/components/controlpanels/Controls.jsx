import { useRef, useContext } from 'react'
import { extend, useFrame, useThree } from '@react-three/fiber'
import { MapControls as MapControlType } from '@react-three/drei';
import {MapControls} from '@react-three/drei';

import GameContext from '../context/GameContext';

extend({ MapControls });

export const Controls = (props) => {

  const { currentConstellation } = useContext(GameContext)
    const { setCurrentConstellation } = useContext(GameContext)

  const controls = useRef(null)

  const { camera, gl } = useThree()

  useFrame(() => {
    if(controls.current) {
      controls.current.update()
    }
  })

  return (
    <MapControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping={true}
      dampingFactor={0.05}
      minDistance={1}
      maxDistance={5000}
      {...props}
    />
  )
}


