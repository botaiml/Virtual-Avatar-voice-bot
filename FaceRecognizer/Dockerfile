FROM ubuntu:18.04
RUN apt-get update
COPY requirements.txt .
# RUN apt remove -y python3.6-dev

RUN apt install -y python3.7   python3.7-dev
RUN DEBIAN_FRONTEND="nonteractive" apt-get install -y tzdata
# RUN apt-get install -y software-properties-common
# RUN add-apt-repository ppa:deadsnakes/ppa
RUN apt install -y curl
RUN apt-get install -y python3.7-distutils

# # Register the version in alternatives
RUN update-alternatives --install /usr/bin/python python /usr/bin/python3.7 1

# # Set python 3 as the default python
RUN update-alternatives --set python /usr/bin/python3.7
COPY get-pip.py .
# RUN apt-get install -y wget

# RUN wget https://bootstrap.pypa.io/get-pip.py 
COPY get-pip.py .
RUN python3.7 get-pip.py
RUN pip3.7 --version

RUN python3.7 --version
# RUN apt-get update && apt-get clean
# RUN apt-get -f install -y libpython3.7-stdlib
# RUN apt-get install -y qt5-default
RUN apt-get install -y libcairo2-dev 
RUN apt install -y libgirepository1.0-dev
#pkg-config python3.7-dev
RUN apt-get install -y libglib2.0-dev libgirepository1.0-dev libgdk-pixbuf2.0-dev libpango1.0-dev libgtk-3-dev
RUN apt-get install -y gstreamer-1.0
RUN pip3.7 install -r requirements.txt

# RUN export DISPLAY=192.168.1.100:0
RUN pip3.7 install tensorflow