import { useState, useRef, useContext } from 'react';
import { TextureLoader } from 'three/src/loaders/TextureLoader';
import GameContext from '../context/GameContext';
import MenuContext from '../context/MenuContext';

const loader = new TextureLoader()


export function BaseHex(props) {

  const tkey = props.tkey
  
  const [status, setStatus] = useState(props.status)

  const {baseImgTable, gridConstants, modTracker} = useContext(GameContext)

  const trackerTable = baseImgTable.get(tkey)
  const table = trackerTable.modMap

  const [currentTextureNr, setCurrentTextureNr] = useState(trackerTable.currentListing)
  const [currentTextureKey, setCurrentTextureKey] = useState(table.get(trackerTable.currentListing).type) 
  const [currentTexture, setCurrentTexture] = useState(() => loader.load(table.get(trackerTable.currentListing).image))
 
  const {currentToolOp} = useContext(MenuContext)


  const geo = useRef(null)

  
  const changeTexture = (props, e) => {
    if(currentTextureKey){
      const nr = currentTextureNr
      if(currentTextureNr > 0 && currentToolOp === currentTextureKey){
        const newNr = currentTextureNr - 1
        const key = table.get(newNr).type
        const img = loader.load(table.get(newNr).image)
        trackerTable.currentListing = newNr
        setCurrentTextureNr(newNr)
        setCurrentTextureKey(key)
        setCurrentTexture(img)
      }
      
    }
    
  }

  
  return (
    <mesh 
        {... props}
        receiveShadow={true}
        status={status}

        onDoubleClick={(e) => changeTexture(props, e)}
        >
      <cylinderGeometry ref={geo} args={[gridConstants.hexRadius, gridConstants.hexRadius, 0.1, 6]} />
      <meshStandardMaterial 
        map={currentTexture}  
        metalness={0.5}
        />
    </mesh>
  );
}




export function BaseFloor(props) {

  const {currentConstellation} = useContext(GameContext)
  const {hexTable} = useContext(GameContext)


  return (
    <group
      {...props}
      key={currentConstellation.currentTile}
      position={[0, 0, 0]}
    >
        {currentConstellation.currentHexBase.map((hexKey) => {
          const hex = hexTable.get(hexKey)
          return (
            <BaseHex
              {...props}
              key={hex.tkey}
              tkey={hex.tkey}
              position={[hex.posX, hex.posY, hex.posZ]}
              rotation={[0, - Math.PI / 6, 0]}
              status={hex.status}
            />
          )
        }
            
        )}

    </group>
    
  );


}
