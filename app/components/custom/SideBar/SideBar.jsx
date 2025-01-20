import './SideBar.css'

function SideBar(){

    return (
        <div id="nav-bar">
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"></link>
        <input id="nav-toggle" type="checkbox"/>
        
        
        <div id="nav-header">
            <a id="nav-title">Dashboard </a>
            <label htmlFor="nav-toggle">
                <span id="nav-toggle-burger"></span>
            </label>
            <hr/>
        </div>

        
        <div id="nav-content">
            <div className="nav-button"><i className="fas fa-home"></i><span>Home</span></div>
            <div className="nav-button"><i className="fas fa-users"></i><span>Team</span></div>
            <div className="nav-button"><i className="fas fa-cog"></i><span>Settings</span></div>
            <hr/>
            <div className="nav-button"><i className="fas fa-question-circle"></i><span>Help</span></div>
            <div className="nav-button"><span></span></div>
            <div className="nav-button"></div>
            <div className="nav-button"><span></span></div>
            <hr/>
            <div className="nav-button"></div>
            <div id="nav-content-highlight"></div>
        </div>

        
        <input id="nav-footer-toggle" type="checkbox"/>
        <div id="nav-footer">
            <div id="nav-footer-heading">
                <div id="nav-footer-avatar">
                </div>
                <div id="nav-footer-titlebox">
                    <a id="nav-footer-title">Weezy</a>
                    <span id="nav-footer-subtitle">Admin</span>
                </div>
                <label htmlFor="nav-footer-toggle">
                    <i className="fas fa-caret-up"></i>
                </label>
            </div>
            <div id="nav-footer-content">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur molestias amet accusantium hic non. Itaque atque reprehenderit, optio adipisci fuga saepe amet rerum distinctio. Libero hic sequi maxime necessitatibus, nemo minima aliquid!
            </div>
        </div>

    </div>
    );
}

export default SideBar;