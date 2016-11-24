import { Component } from '@angular/core';

@Component({
    selector: 'prop-task-tile',
    templateUrl: 'task-tile.component.html',
    styleUrls: ['task-tile.component.less']
})
export class TaskTileComponent {

    tasks = [
        {
            icon: 'file_upload',
            when: '19/10/2016',
            who: 'Réparateur',
            description: 'Envoi de document <span class="new badge blue">2</span>'
        },
        {
            icon: 'create_new_folder',
            when: '10/10/2016',
            who: 'GBU',
            description: 'Création d\'une mission'
        },
        {
            icon: 'edit',
            when: '22/11/2016',
            who: 'GBU',
            description: 'Ajout d\'informations sur l\'assuré'
        },
        {
            icon: 'attachment',
            when: '05/10/2016',
            who: 'Assuré',
            description: 'Envoi de photos'
        },
        {
            icon: 'edit',
            when: '22/11/2016',
            who: 'GBU',
            description: 'Ajout d\'informations sur le contrat'
        }
    ];

    constructor() { }
}