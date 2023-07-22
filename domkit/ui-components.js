import * as UI from './ui.js';

export function Button(...args) {
	return (new UI.Button(...args));
}

export function ButtonLink(...args) {
	return (new UI.ButtonLink(...args));
}

export function Link(...args) {
	return (new UI.Link(...args));
}

export function Input(...args) {
	return (new UI.Input(...args));
}

export function Select(...args) {
	return (new UI.Select(...args));
}

export function Block(...args) {
	return (new UI.Block(...args));
}

export function Header(...args) {
	return (new UI.Header(...args));
}

export function Text(...args) {
	return (new UI.Text(...args));
}

export function Paragraph(...args) {
	return (new UI.Paragraph(...args));
}

export function Newline(...args) {
	return (new UI.Newline(...args));
}

export function Badge(...args) {
	return (new UI.Badge(...args));
}

export function Container(...args) {
	return (new UI.Container(...args));
}

export function HorizontalLayout(...args) {
	return (new UI.HorizontalLayout(...args));
}

export function NavigationMenu(...args) {
	return (new UI.NavigationMenu(...args));
}

export function Card(...args) {
	return (new UI.Card(...args));
}

export function List(...args) {
	return (new UI.List(...args));
}

export function Segment(...args) {
	return (new UI.Segment(...args));
}

export function Overlay(...args) {
	return (new UI.Overlay(...args));
}

export function TopMenu(...args) {
	return (new UI.TopMenu(...args));
}

export function BottomMenu(...args) {
	return (new UI.BottomMenu(...args));
}

export function Space(...args) {
	return (new UI.Space(...args));
}

export const importCSSFiles = UI.importCSSFiles;
export const useLoader = UI.useLoader;