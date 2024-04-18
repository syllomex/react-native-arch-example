type Subscriber<T> = (value: T) => Promise<void>

type Subscriptions<T> = Record<string, Subscriber<T>>

export abstract class Observable<T = unknown> {
  abstract name: string

  protected subscriptions: Subscriptions<T> = {}

  async emit(value: T) {
    const subscriptions = Object.values(this.subscriptions)
    await Promise.all(subscriptions.map(async subscriber => await subscriber(value)))
  }

  subscribe(key: string, subscriber: Subscriber<T>) {
    this.subscriptions = {
      ...this.subscriptions,
      [key]: subscriber,
    }

    return () => {
      const { [key]: _removed, ...remaining } = this.subscriptions
      this.subscriptions = remaining
    }
  }
}
