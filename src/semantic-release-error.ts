class SemanticReleaseError implements Error {
  public semanticRelease?: boolean;
  public name: string = "SemanticReleaseError";

  constructor(public message = "", public code?: string, public details?: string) {
    Error.captureStackTrace(this, this.constructor);
    this.name = "SemanticReleaseError";
    this.code = code;
    this.details = details;
    this.semanticRelease = true;
  }
}

export default SemanticReleaseError;
