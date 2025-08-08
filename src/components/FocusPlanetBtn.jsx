import '../styles/FocusPlanetBtn.scss';

const FocusPlanetBtn = ({ focusOnPlanet, focusedPlanet }) => {
    const planets = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

    return (
        <div className='focusPlanetBtns'>
            <h3>Focus A Celestial Body</h3>
            <ul>
                {planets.map(planet => (
                    <li
                        key={planet}
                        onClick={() => focusOnPlanet(planet)}
                        className={focusedPlanet === planet ? 'focused' : ''}
                    >
                            Look at {planet[0].toUpperCase()}${planet.slice(1)}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default FocusPlanetBtn;
