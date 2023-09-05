function Sidebar({displayNone=false}) {
  return (
    <aside className={`sideNav ${displayNone ? "toggleDisplay" : "toggleAsideResponsive"}`} > 
        <h3 className="sideNavHeadline">
            Structure
        </h3>

        <ul className="sideNavUl">
            <li>
                <a href="#GeneralID">
                    General
                </a>
            </li>
            <li>
                <a href="#ProjectID">
                    Projects
                </a>
            </li>
            <li>
                <a href="#ServiceID">
                    Service
                </a>
            </li>
            <li>
                <a href="#CustomerID">
                    Customer
                </a>
            </li>
            <li>
                <a href="#SocialMediaID">
                    Social Media
                </a>
            </li>

        </ul>
    </aside>
  );
}

export default Sidebar;
