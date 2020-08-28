<template>
    <div>
        <div>
            <h5>Search fundi address</h5>
            <label>
                <gmap-autocomplete @place_changed="setPlace"></gmap-autocomplete>
                <b-button @click="addMarker" class="button-search">Add Location</b-button>
            </label>
            <br/>

        </div>
        <br>
        <gmap-map
                :center="center"
                :zoom="12"
                style="width:100%;  height: 200px;"
        >
            <gmap-marker
                    :key="index"
                    v-for="(m, index) in markers"
                    :position="m.position"
                    @click="center=m.position"
            ></gmap-marker>
        </gmap-map>
    </div>
</template>

<script>
    export default {
        name: "GoogleMap",
        data() {
            return {
                // default to Montreal to keep it simple
                // change this to whatever makes sense
                center: { lat: -6.82346, lng: 39.26951 },
                markers: [],
                places: [],
                currentPlace: null,
                payload:{lat:'',lng:'',address:''}
            };
        },

        mounted() {
            this.geolocate();
        },

        methods: {
            // receives a place object via the autocomplete component
            setPlace(place) {
                this.currentPlace = place;
            },
            addMarker() {
                if (this.currentPlace) {
                    const marker = {
                        lat: this.currentPlace.geometry.location.lat(),
                        lng: this.currentPlace.geometry.location.lng()
                    };
                    this.markers.push({ position: marker });
                    this.places.push(this.currentPlace);
                    this.center = marker;

                    this.payload.lat = marker.lat
                    this.payload.lng = marker.lng
                    this.payload.address = this.currentPlace.name

                    this.$emit('updateAddress',this.payload)

                    this.currentPlace = null;
                }
            },
            geolocate: function() {
                navigator.geolocation.getCurrentPosition(position => {
                    this.center = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                });
            }
        }
    };
</script>

<style>
    .button-search{
        box-shadow: none !important;
        width: 211px !important;
        height: 30px;
        font-style: normal !important;
        font-weight: bold !important;
        font-size: 10px !important;
        line-height: 16px !important;
        /* identical to box height, or 160% */
        text-align: center !important;
        color: #FFFFFF !important;
        background-color: #de0b15 !important;
    }
</style>