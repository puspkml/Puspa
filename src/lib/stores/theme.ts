import { writable } from 'svelte/store';
import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
	if (!browser) return 'light';
	
	const stored = localStorage.getItem('theme') as Theme | null;
	if (stored) return stored;
	
	if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
		return 'dark';
	}
	
	return 'light';
};

const applyTheme = (theme: Theme) => {
	if (!browser) return;
	
	const root = document.documentElement;
	
	if (theme === 'dark') {
		root.classList.add('dark');
		root.setAttribute('data-theme', 'dark');
	} else {
		root.classList.remove('dark');
		root.setAttribute('data-theme', 'light');
	}
};

const createThemeStore = () => {
	const { subscribe, set, update } = writable<Theme>(getInitialTheme());

	return {
		subscribe,
		toggle: () => {
			update((current) => {
				const newTheme = current === 'light' ? 'dark' : 'light';
				if (browser) {
					localStorage.setItem('theme', newTheme);
					applyTheme(newTheme);
				}
				return newTheme;
			});
		},
		set: (theme: Theme) => {
			if (browser) {
				localStorage.setItem('theme', theme);
				applyTheme(theme);
			}
			set(theme);
		},
		init: () => {
			if (browser) {
				const theme = getInitialTheme();
				applyTheme(theme);
				set(theme);
			}
		}
	};
};

export const theme = createThemeStore();
