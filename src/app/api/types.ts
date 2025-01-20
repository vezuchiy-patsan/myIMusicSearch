export interface SearchMediaArg {
	term: string;
	country?: string;
	media?: string;
	entity?: string;
	limit?: number;
}

export interface ITunesResponse {
	resultCount: number;
	results: SearchMediaResponse[];
}
export interface SearchMediaResponse {
	wrapperType: 'track' | 'collection' | 'artist';
	kind:
		| 'book'
		| 'album'
		| 'coached-audio'
		| 'feature-movie'
		| 'interactive-booklet'
		| 'music-video'
		| 'pdf'
		| 'podcast'
		| 'podcast-episode'
		| 'software-package'
		| 'song'
		| 'tv-episode';
	trackName: string;
	artistName: string;
	artistLinkUrl?: string;
	collectionName: string;
	collectionCensoredName?: string;
	trackCensoredName?: string;
	artworkUrl30?: string;
	artworkUrl60?: string;
	artworkUrl100?: string;
	collectionViewUrl: string;
	trackViewUrl: string;
	previewUrl?: string;
	trackTimeMillis?: number;
	trackId: number;
	collectionId: number;
	collectionPrice: number;
	trackPrice: number;
	trackRentalPrice?: number;
	collectionHdPrice?: number;
	trackHdPrice?: number;
	trackHdRentalPrice?: number;
	releaseDate: string;
	collectionExplicitness: 'explicit' | 'cleaned' | 'notExplicit';
	trackExplicitness: 'explicit' | 'cleaned' | 'notExplicit';
	discCount: number;
	discNumber: number;
	trackCount: number;
	trackNumber: number;
	country: string;
	currency: string;
	primaryGenreName: string;
	contentAdvisoryRating: string;
	longDescription: string;
	hasITunesExtras: boolean;
}
