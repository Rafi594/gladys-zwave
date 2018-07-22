# Gladys Zwave

Need Gladys version >= 3.9 and open-zwave installed on the machine running Gladys.

Open-Zwave is already installed in the prebuilt Gladys Raspbian image you can download on Gladys website.

If you want to use it on a classic Raspbian image, all you have to do is to :

- Install Open Zwave on it (Instructions are at the end of this README)
- Update Gladys to version >= 3.9

### Installation

- Plug your Zwave USB stick on your Raspberry Pi
- Install the module in Gladys in the store
- Reboot Gladys

### Usage

Go the configuration panel. 

You can here configure your z-wave installation !

## Install Open Zwave manually Raspberry Pi

Eexecute the following commands : 

```
sudo apt-get install libudev-dev
git clone https://github.com/OpenZWave/open-zwave.git
cd open-zwave
make
sudo make install && sudo ldconfig
```