export declare class ObservableSet extends WeakSet<Element> {
    private readonly listeners;
    addListener(item: Element, cb: Function): () => void;
    add(item: Element): this;
}
