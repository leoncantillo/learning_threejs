import '../styles/SwitchDataSizeBtn.scss';

const SwitchDataSizeBtn = ({ setDataScale }) => {
    return (
        <ul className='sizeSwitchers'>
            <li onClick={() => setDataScale('real')} className="btnSizeSiwtcher">
                <i className="fa-solid fa-down-left-and-up-right-to-center"></i>
                <span>Real Scaled</span>
            </li>
            <li onClick={() => setDataScale('x100')} className="btnSizeSiwtcher">
                <i className="fa-solid fa-up-right-and-down-left-from-center"></i>
                <span>Scaled x100</span>
            </li>
            <li onClick={() => setDataScale('big')} className="btnSizeSiwtcher">
                <i className="fa-solid fa-maximize"></i>
                <span>Big Scaled</span>
            </li>
        </ul>
    );
};

export default SwitchDataSizeBtn;
