using System.Runtime.Serialization;

namespace products.core.Exceptions;

[Serializable]
public class MissingApiKeyException : Exception
{
    public MissingApiKeyException(string message)
        : base(message)
    {
    }

    protected MissingApiKeyException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}