import React from 'react'

const LocationSearchPanel = (props) => {
    const suggestions = props.suggestions || [];

    return (
        <div className='overflow-scroll max-h-full'>
            {props.isLoading && (
                <p className='text-sm text-gray-500 py-2'>Loading suggestions...</p>
            )}

            {!props.isLoading && props.error && (
                <p className='text-sm text-red-500 py-2'>{props.error}</p>
            )}

            {!props.isLoading && !props.error && suggestions.length === 0 && (
                <p className='text-sm p-2 mt-4 text-gray-500 py-2'>Start typing to see nearby places.</p>
            )}

            {suggestions.map((suggestion, index) => {
                const label = suggestion.description || suggestion.structured_formatting?.main_text || 'Unknown location';
                const secondaryText = suggestion.structured_formatting?.secondary_text || '';

                return (
                    <div className='pt-5' key={suggestion.place_id || `${label}-${index}`}>
                        <div 
                            onClick={() => {
                                props.onSuggestionSelect?.(suggestion, props.activeField);
                            }}
                            className='flex items-start mb-2 gap-4 active:border-black border-2 p-3 rounded-xl border-gray-200 justify-start'
                        >
                            <h2 className='bg-[#eee] p-2 rounded-full h-8 w-12 flex items-center justify-center'>
                                <i className="ri-map-pin-line"></i>
                            </h2>
                            <div>
                                <h5 className='text-sm'>{label}</h5>
                                {secondaryText ? <p className='text-xs text-gray-500'>{secondaryText}</p> : null}
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    )
}

export default LocationSearchPanel
