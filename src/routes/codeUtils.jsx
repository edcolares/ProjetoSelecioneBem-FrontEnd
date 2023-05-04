/**
 * Função para definir a cor usada no BAGDE nas SKILLS
 */
export const colorBadgeSkills = (type) => {
    let colorBadge;
    switch (type) {
        case 'Soft':
        case 'Soft Skill':
            colorBadge = 'warning';
            break;

        case 'Hard':
        case 'Hard Skill':
            colorBadge = 'danger';
            break;
        default:
            colorBadge = 'primary';
    }
    return colorBadge;
};