class BlueCarbonAIException(Exception):
    """Base exception for the application."""
    pass


class SatelliteImageNotFound(BlueCarbonAIException):
    """Raised when no Sentinel-2 image is available."""
    pass


class InvalidEcosystemError(BlueCarbonAIException):
    """Raised when an unsupported ecosystem is requested."""
    pass


class EarthEngineError(BlueCarbonAIException):
    """Raised when Google Earth Engine fails."""
    pass