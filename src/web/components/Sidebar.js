/* global window */
import React from 'react';
import { Col, Nav, NavItem } from 'reactstrap';
import { Link } from 'react-router-dom';

const SidebarNavItems = () => (
  <div>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/">
        <i className="icon-home" />
        {' '}
        <span>
          Home
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/' && 'active'}`} to="/help">
        <i className="icon-home" />
        {' '}
        <span>
          Help
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname.startsWith('/recipe') && 'active'}`} to="/recipes">
        <i className="icon-notebook" />
        {' '}
        <span>
          Workers
        </span>
      </Link>
    </NavItem>
    <NavItem>
      <Link className={`nav-link ${window.location.pathname === '/credits' && 'active'}`} to="/credits">
        <i className="icon-notebook" />
        {' '}
        <span>
          Credits
        </span>
      </Link>
    </NavItem>
  </div>
);

const Sidebar = () => (
  <div>
    <Col sm="3" md="2" className="d-none d-sm-block sidebar">
      <Nav vertical>
        {SidebarNavItems()}
      </Nav>
    </Col>
  </div>
);

export { Sidebar, SidebarNavItems };
