import '../styles/FocusPlanetBtn.scss';

const FocusPlanetBtn = ({ focusOnPlanet }) => {
    return (
        <div className='focusPlanetBtns'>
            <h3>Focus A Celestial Body</h3>
            <ul>
                <li onClick={() => focusOnPlanet('sun')} style={{ margin: '5px' }}>
                    Look at Sun
                </li>
                <li onClick={() => focusOnPlanet('mercury')} style={{ margin: '5px' }}>
                    Look at Mercury
                </li>
                <li onClick={() => focusOnPlanet('venus')} style={{ margin: '5px' }}>
                    Look at Venus
                </li>
                <li onClick={() => focusOnPlanet('earth')} style={{ margin: '5px' }}>
                    Look at Earth
                </li>
                <li onClick={() => focusOnPlanet('mars')} style={{ margin: '5px' }}>
                    Look at Mars
                </li>
                <li onClick={() => focusOnPlanet('jupiter')} style={{ margin: '5px' }}>
                    Look at Jupiter
                </li>
                <li onClick={() => focusOnPlanet('saturn')} style={{ margin: '5px' }}>
                    Look at Saturn
                </li>
                <li onClick={() => focusOnPlanet('uranus')} style={{ margin: '5px' }}>
                    Look at Uranus
                </li>
                <li onClick={() => focusOnPlanet('neptune')} style={{ margin: '5px' }}>
                    Look at Neptune
                </li>
                <li onClick={() => focusOnPlanet('pluto')} style={{ margin: '5px' }}>
                    Look at Pluto
                </li>
            </ul>
        </div>
    );
};

export default FocusPlanetBtn;
