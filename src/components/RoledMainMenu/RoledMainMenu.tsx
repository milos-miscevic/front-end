import React from 'react';
import { MainMenuItem, MainMenu } from '../MainMenu/MainMenu';

interface RoledMainMenuProperties {
    role: 'administrator' | 'visitor'
}

export default class RoledMainMenu extends React.Component<RoledMainMenuProperties>{

    render() {
        let items: MainMenuItem[] = [];

        switch (this.props.role) {
            case 'visitor': items = this.getVisitorMenuItems(); break;
            case 'administrator': items = this.getAdministratorMenuItems(); break;
        }

        let showCart = false;
        if (this.props.role === 'visitor') {
            showCart = true;
        }

        return <MainMenu items={items} showCart={showCart} />

    }

    getVisitorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Home", "/"),
            new MainMenuItem("Contact", "/contact"),
            new MainMenuItem("Login", "/login"),
        ];
    }

    getAdministratorMenuItems(): MainMenuItem[] {
        return [
            new MainMenuItem("Dashboard", "/administrator/dashboard/"),
            new MainMenuItem("Logout", "/administrator/logout/"),
        ];
    }

}