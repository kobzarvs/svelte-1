<script>
    import Header from './components/Header.svelte'
    import Sidebar from './components/Sidebar.svelte'
    import Main from './components/Main.svelte'
    import Footer from './components/Footer.svelte'


    export let name
</script>

<div class="layout">
    <Header />
    <Sidebar />
    <Main />
    <Footer />
</div>

<style>
    .layout {
        border: 1px solid red;
        height: 100%;
        width: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: stretch;
    }
</style>
