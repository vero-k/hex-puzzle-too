import Button from 'react-bootstrap/Button'
import {useContext} from 'react'
import { PerspectiveContext } from '../game/Game'


export const PerspectiveMenus = (props) => {

    const perspective = useContext(PerspectiveContext)

    const togglePerspective = () =>{

    }
    
    return(<>
    
        <Button variant="primary" onClick={() => togglePerspective()}>
                {"change to " + perspective}
        </Button>

    </>)
}