'use client';

export default function Error({
                                  error,
                                  reset,
                              }: {
    error: Error;
    reset: () => void;
}) {
    return (
        <div>
            <h2>Произошла ошибка</h2>
            <p>{error.message}</p>
            <button onClick={reset}>Повторить</button>
        </div>
    );
}
