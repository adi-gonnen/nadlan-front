       <router-link to="/gallery" @click.native="setFilter(city)" class="city-home-page flex column">
          <!-- <router-link to="/gallery" @click.native="setFilter(city)" class="city-home-page flex column"> -->
            <h1>{{city}}</h1>
            <!-- <image-render :src="setCityImg(city)"></image-render> -->
            <img :src="setCityImg(city)"/>
            <!-- <img :src="src"/> -->
            <!-- <img src="img/houses/house1.jpg"/> -->
          </router-link>