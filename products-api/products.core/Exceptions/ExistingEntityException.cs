using System.Runtime.Serialization;

namespace products.core.Exceptions;

[Serializable]
public class ExistingEntityException : Exception
{
    public ExistingEntityException(string message)
        : base(message)
    {
    }

    protected ExistingEntityException(SerializationInfo info, StreamingContext context)
        : base(info, context)
    {
    }
}