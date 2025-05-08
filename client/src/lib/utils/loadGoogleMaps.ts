export const loadGoogleMapsApi = (apiKey: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		if ((window as any).google?.maps) return resolve();

		const script = document.createElement('script');
		script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&v=weekly&region=US`;
		script.async = true;
		script.defer = true;
		script.onload = () => resolve();
		script.onerror = () => reject(new Error('Failed to load Google Maps API'));
		document.body.appendChild(script);
	});
};
