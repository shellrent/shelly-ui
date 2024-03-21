import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { useShellyContext } from '../Provider';

export const useTranslation = () => {
	const {i18n, lang} = useShellyContext();

	if ( lang && lang !== i18n.language ) {
		i18n.changeLanguage( lang );
	}

	return i18n;
};

i18n
	.use(initReactI18next)
	.init({
		lng: 'en',
		fallbackLng: 'en',
		debug: false,
		resources: {
			en: {
				tables: {
					reset_filter_button_label: 'Reset',
					apply_filter_button_label: 'Apply',
					edit_button_label: 'Edit',
					delete_button_label: 'Delete',
					details_button_label: 'Details',
					edit_password_button_label: 'Edit password',
					empty_body_label: 'No elements found',
					total_count_label: 'Pages: {{total}}'
				},
				inputs: {
					all_placeholder: 'All'
				}
			},
			it: {
				tables: {
					reset_filter_button_label: 'Reset',
					apply_filter_button_label: 'Applica',
					edit_button_label: 'Modifica',
					delete_button_label: 'Cancella',
					details_button_label: 'Dettagli',
					edit_password_button_label: 'Modifica password',
					empty_body_label: 'Nessun elemento da visualizzare',
					total_count_label: 'Pagine totali: {{total}}'
				},
				inputs: {
					all_placeholder: 'Tutti'
				}
			}
		},
		defaultNS: ['shelly-ui'],
	});

export default i18n;