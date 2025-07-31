import '../styles/FocusPlanetBtn.scss';

const FocusPlanetBtn = ({ focusOnPlanet }) => {
    return (
        <div className='focusPlanetBtns'>
            <h3>Focus A Celestial Body</h3>
            <ul>
                <li onClick={() => focusOnPlanet('sun')} style={{ margin: '5px' }}>
                Ver Sol
                </li>
                <li onClick={() => focusOnPlanet('earth')} style={{ margin: '5px' }}>
                    Ver Tierra
                </li>
                <li onClick={() => focusOnPlanet('jupiter')} style={{ margin: '5px' }}>
                    Ver Jupiter
                </li>
            </ul>
        </div>
    );
};

export default FocusPlanetBtn;
